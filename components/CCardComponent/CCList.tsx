import { View, Text, ActivityIndicator, Alert, Pressable, Button, FlatList, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CCard } from '@/src/types';
import { MaterialIcons } from '@expo/vector-icons';

const fetchCards = async (): Promise<CCard[]> => {
    console.log('fetchCards Replace with actual API call...')
    return [
        { id: '1', last4digit: '1234', first6digit: '123432' },
        { id: '2', last4digit: '5678', first6digit: '45436' },
    ];
}
const addCard = async (cardDetails: CCard): Promise<CCard> => {
    console.log('// Replace with actual API call to add a CCard object')
    return { id: '3', last4digit: cardDetails.last4digit };
};

const removeCard = async (id): Promise<boolean> => {
    console.log('// Replace with actual API call to remove a CCard object')
    return true;
};


const CCList = (updateSelection: any) => {
    const [cards, setCards] = useState<CCard[]>([]); // Array of CCard objects
    const [selectedCard, setSelectedCard] = useState<CCard | null>(null);
    useEffect(() => {
        // Fetch the list of CCard objects when the component mounts
        const loadCards = async () => {
            try {
                const cardList = await fetchCards();
                setCards(cardList); // Set the fetched array of CCard objects
            } catch (error) {
                Alert.alert('Error', 'Failed to load cards');
            }
        };
        loadCards();
    }, []);
    const handleAddCard = async () => {
        try {
            const newCard = await addCard({ last4digit: '9999' }); // Dummy card details, replace with real data as needed
            setCards((prevCards) => [...prevCards, newCard]);
        } catch (error) {
            Alert.alert('Error', 'Failed to add card');
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
                    onPress={handleAddCard}
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
    };
    return (
        <View className='border border-blue-600 flex-1 p-4' >
            <FlatList
                data={[...cards, { id: 'addCard' }]} // Adding the "Add Card" item at the end
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                ListEmptyComponent={<Text>No cards available</Text>}
            />
        </View>
    );
    return (
        <View className='border border-blue-600'>
            <Text>CCList</Text>
            <ActivityIndicator />
        </View>
    )
}

export default CCList