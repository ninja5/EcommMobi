import { View, Text, ActivityIndicator, FlatList, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GAddress } from '@/src/types';
import AzAddress from './AzAddress';

type UpdateSelectionType = (selectedItem: GAddress | null) => void;

const AddressListSection: React.FC<{ updateSelection: UpdateSelectionType }> = ({ updateSelection }) => {
    const [gettingData, setGettingData] = useState<boolean>(true)
    const [addresses, setAddresses] = useState<GAddress[]>([]); // Array of Address objects
    const [selectedAddress, setSelectedAddress] = useState<GAddress | null>(null);
    const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);

    useEffect(() => {
        setGettingData(true)
        //TODO add fetch all addresses from past order of the customer
        setAddresses([{ description: 'Affs,sdfsdf,sdfsd' }, { description: 'tigfg, skfjsd, lefj' }, { description: 'eedcc yhtnvv, urhfn' }])
        setGettingData(false)
    }, [])
    useEffect(() => { updateSelection(selectedAddress) }, [selectedAddress])
    if (gettingData) {
        return (<View className='justify-center flex-1 p-4'>
            <ActivityIndicator />
        </View>)
    }
    const addToAddressList = (item: GAddress | null) => {
        if (!item) {
            return
        }
        console.log('hi from adding item to the possible address for selection', item);
        setAddresses([...addresses, item])
        setIsAddAddressVisible(false)

    }
    const renderAddress = ({ item }: { item: GAddress }) => {
        console.log('hi from rendeaddAddreessr address', item);
        if (item?.description === 'Add Address') {
            return (
                <Pressable
                    onPress={() => setIsAddAddressVisible(true)}
                >
                    <View className='flex-row border rounded-md h-12 justify-center items-center px-2 bg-gray-300'>
                        <Text className='text-lg'>+ {item.description}...</Text>
                    </View>
                </Pressable>)
        }
        return (<Pressable
            onPress={() => { setSelectedAddress(item) }}
        >
            <View className={`${selectedAddress?.description === item.description ? 'bg-gray-300' : 'bg-white'} flex-row border rounded-md h-12 justify-between items-center place-items-center px-2`}>
                <Text className=''>{item.description}</Text>
            </View>
        </Pressable>)
    }
    return (
        <View className='flex-1'>
            <FlatList
                contentContainerStyle={{
                    gap: 12,
                }}
                data={[...addresses, { description: 'Add Address' }]} // add podibitiy to add address 
                keyExtractor={(item) => item.description}
                renderItem={renderAddress}
                ListEmptyComponent={<Text>No addresses availble</Text>} //never happens as i am addinnt one
            />
            <Modal
                visible={isAddAddressVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAddAddressVisible(false)}
            >
                <View className='absolute top-0 left-0 right-0 h-full bg-black/50 justify-start items-center pt-12'>
                    <View className='w-11/12 max-w-2xl h-2/3 bg-slate-200 rounded-lg p-5'>
                        <AzAddress updateAddress={addToAddressList} />
                        <Pressable
                            className='mt-auto bg-red-500 rounded-md items-center'
                            onPress={() => setIsAddAddressVisible(false)}
                        >
                            <Text className='text-white text-lg py-2'>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AddressListSection