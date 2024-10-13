import { View, Text, ActivityIndicator, Alert, Pressable, Button, FlatList, Platform, Modal, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CCard } from '@/src/types';
import { MaterialIcons } from '@expo/vector-icons';
import { CreditCardInput } from 'react-native-credit-card-input';
import { useAuth } from '@/src/providers/AuthProvider';
import { PayarcAddCreditCard, PayarcCustomerRetrieve, PayarcCustomerUpdate } from '@/lib/payarc';

type UpdateSelectionType = (selectedItem: CCard | null) => void;

const fetchCards = async (payarc_user_id: string): Promise<CCard[]> => {
    console.log('fetchCards Replace with actual API call... for user', payarc_user_id)
    if (!payarc_user_id) return []
    try {
        const data = await PayarcCustomerRetrieve(payarc_user_id);
        console.log('Result in PayarcCustomerRetrieve', data);
        return Array.isArray(data?.card?.data) ? data.card.data : [];
    } catch (error) {
        console.error('Error fetching cards:', error);
        return [];
    }
    // return [
    //     { id: '1', last4digit: '1234', first6digit: '123432' },
    //     { id: '2', last4digit: '5678', first6digit: '45436' },
    // ];
}
const addCard = async (payarc_object_id: string, cardDetails: CCard): Promise<CCard> => {
    console.log('// Replaced with actual API call for ', payarc_object_id, ' to add a CCard object ', cardDetails)
    try {
        const data = await PayarcAddCreditCard(payarc_object_id, cardDetails)
        console.log('Result of adding card', data);
        return data
    } catch (error) {
        console.error('Opps adding CC result', error);
        return {}
    }

};

const removeCard = async (id: string | null | undefined): Promise<boolean> => {
    console.log('// Replace with actual API call to remove a CCard object')
    return true;
};


const CCList: React.FC<{ updateSelection: UpdateSelectionType }> = ({ updateSelection }) => {
    const [cards, setCards] = useState<CCard[]>([]); // Array of CCard objects
    const [selectedCard, setSelectedCard] = useState<CCard | null>(null);
    const [isAddCardVisible, setIsAddCardVisible] = useState(false);
    const [gettingData, setGettingData] = useState<boolean>(false)
    const { user } = useAuth()
    useEffect(() => {
        // Fetch the list of CCard objects when the component mounts
        const loadCards = async () => {
            setGettingData(true)
            try {
                const cardList = user.payarc_object_id ? await fetchCards(user.payarc_object_id) : [];
                setCards(cardList); // Set the fetched array of CCard objects
            } catch (error) {
                Alert.alert('Error', 'Failed to load cards');
            } finally {
                setGettingData(false)
            }
        };
        loadCards();
    }, []);
    useEffect(() => { updateSelection(selectedCard) },
        [selectedCard])
    const handleAddCard = async ({ type: brand, number, expiry, cvc }: { type: string; number: string; expiry: string; cvc: string }) => {
        setGettingData(true)
        try {
            if (!user.payarc_object_id) throw Error('User is undefined, when adding a cards, contact support')
            const exp_month = expiry.split('/')[0]
            const exp_year = '20' + expiry.split('/')[1]
            const card_number = Number(number.replace(/ /g, ''));
            const cvv = Number(cvc)
            const newCard = await addCard(user.payarc_object_id, { brand, cvv, exp_month, exp_year, card_number }); // Dummy card details, replace with real data as needed
            setCards((prevCards) => [...prevCards, newCard]);
            setIsAddCardVisible(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to add card');
        } finally {
            setGettingData(false)
        }
    };
    const confirmRemoveCard = (card: CCard) => {
        if (Platform.OS === 'web') {
            // For web, use window.confirm
            const isConfirmed = window.confirm('Are you sure you want to remove this card?');
            if (isConfirmed) {
                handleRemoveCard(card);
            }
        } else {
            Alert.alert(
                'Confirm Removal',
                'Are you sure you want to remove this card?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => handleRemoveCard(card),
                    },
                ]
            );
        }
    };

    const handleRemoveCard = async (card: CCard) => {
        try {
            const success = await removeCard(card.id);
            if (success) {
                setCards((prevCards) => prevCards.filter((item) => item.id !== card.id));
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to remove card');
        }
    };

    const renderCard = ({ item }: { item: CCard }) => {
        console.log('hi from render card', item);

        if (item.id === 'addCard') {
            // Special render for the "Add Card" button
            return (
                <Pressable
                    onPress={() => setIsAddCardVisible(true)}
                    style={{
                        padding: 16,
                        marginVertical: 8,
                        backgroundColor: '#e0e0e0',
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 16 }}>+ Add Card</Text>
                </Pressable>
            );
        }

        return (
            <Pressable
                onPress={() => setSelectedCard(item)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 16,
                    marginVertical: 8,
                    backgroundColor: selectedCard?.id === item.id ? '#ddd' : '#fff',
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 8,
                }}
            >
                <Text>{item.first6digit} .... {item.last4digit}</Text>
                {/* <Pressable onPress={() => handleRemoveCard(item)} >Remove</Pressable> */}
                <MaterialIcons name='remove-circle-outline' size={24} className='text-red text-2xl' onPress={() => confirmRemoveCard(item)} />
            </Pressable>
        );
    }
    const handleCardInputChange = (form) => {
        if (form.valid) {
            console.log('c\'est partie');

            handleAddCard(form.values); // Only add if form is valid
        }
    }
    if (gettingData) {
        return (<View className='self-center align-middle flex-1 p-4'>
            <ActivityIndicator />
        </View>)
    }
    return (
        <View className='flex-1 p-4' >
            <FlatList
                data={[...cards, { id: 'addCard' }]} // Adding the "Add Card" item at the end
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                ListEmptyComponent={<Text>No cards available</Text>}
            />
            {/* Modal for adding card */}
            <Modal
                visible={isAddCardVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAddCardVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <CreditCardInput
                            requiresName={false}
                            requiresCVC={true}
                            requiresPostalCode={false}
                            onChange={handleCardInputChange}
                            labels={{
                                number: 'Card Number',
                                expiry: 'Expiry',
                                cvc: 'CVC',
                            }}
                            placeholders={{
                                number: '1234 5678 1234 5678',
                                expiry: 'MM/YY',
                                cvc: 'CVC',
                            }}
                            inputStyle={{ fontSize: 18, color: '#000' }}
                        />
                        <Pressable
                            onPress={() => setIsAddCardVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={{ color: '#fff', fontSize: 16 }}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginVertical: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    addCardButton: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#e0e0e0',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#d9534f',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
});

export default CCList