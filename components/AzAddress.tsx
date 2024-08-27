import { View, Text, TextInput, Platform, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { randomUUID } from 'expo-crypto'
import Colors from '@/constants/Colors';
import AzTextInput from './AzTextInput';
import { PlaceAutocompletePrediction } from '@/src/types';

const AzAddress = () => {
    const [inputAddress, setInputAddress] = useState<string>('')
    const [suggestions, setSuggestions] = useState<PlaceAutocompletePrediction[]>([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const getAPIData = async () => {
            console.log('====================================');
            console.log('hi from get api data ', inputAddress);
            console.log('====================================');
            console.log('selected value', selectedValue)

            if (inputAddress.length < 3) {
                setSuggestions([])
                return
            }
            if (selectedValue === inputAddress) {//to not initialise the list of suggestions
                return
            }
            const sessionId = randomUUID()
            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API}&input=${inputAddress}&language=bg&types=geocode&sessiontoken=${sessionId}`
            try {
                let result = null
                if (Platform.OS === 'web') {
                    result = Colors.locationExam
                    //result = await result.json()
                } else {
                    const data = await fetch(url)
                    result = await data.json()
                }
                setSuggestions(result?.predictions ? result?.predictions : [])
                console.log('resultltltltlt', result, suggestions);

            } catch (error) {
                console.log('errrorororororor', error);

            }
            console.log('====================================');
            console.log('resut of the api', suggestions);
            console.log('====================================');
        }
        getAPIData()
    }, [inputAddress])
    const handleSelect = (item: PlaceAutocompletePrediction) => {
        setSuggestions([]);
        setSelectedValue(item.description);
        setInputAddress(item.description);
    };

    return (
        <View>
            {/* <Text>AzAddress</Text> */}
            {/* <Text>{process.env.EXPO_PUBLIC_GOOGLE_MAP_API}</Text> */}
            {/* <TextInput value={inputAddress} onChangeText={setInputAddress} /> */}
            <View className='px-8'>
                <AzTextInput
                    title={'Delivery Address'}
                    value={inputAddress}
                    handleChangeText={setInputAddress}
                    placeholder={undefined}
                    otherStyles={undefined}
                    keyboardType={undefined}
                    disabled={false}
                    //handleBlur={undefined}
                    handleBlur={() => {
                        setTimeout(() => {
                            setSuggestions([]);
                        }, 200);
                    }}
                />
                {suggestions.length > 0 && (
                    <FlatList
                        className="mt-2 border border-gray-300 rounded max-h-60"
                        data={suggestions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                className="p-3 border-b border-gray-200"
                                onPress={() => {
                                    handleSelect(item)
                                }}
                            >
                                <Text>{item.description}</Text>
                            </Pressable>
                        )} />
                )}
            </View>
        </View>
    )
}

export default AzAddress

// import { View, Text, Alert, TextInput, Button } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import * as Location from 'expo-location'

// const AzAddress = () => {
//     const [location, setLocation] = useState<Location.LocationObject>()
//     const [address, setAddress] = useState<String>('')
//     useEffect(() => {
//         const getPermissions = async () => {
//             const { status } = await Location.requestForegroundPermissionsAsync()
//             if (status !== 'granted') {
//                 console.log('Please grant location permission');
//                 return //TODO(<Alert  />)
//             }
//             const currentLocation = await Location.getCurrentPositionAsync({})
//             setLocation(currentLocation)
//             console.log('====================================');
//             console.log('Current location', location, currentLocation);
//             console.log('====================================');
//         }
//         getPermissions()
//     }, [])
//     const geoCode = async () => {
//         const geoLocation = await Location.geocodeAsync(address)
//         console.log('====================================');
//         console.log('Geocode result');
//         console.log(geoLocation);

//         console.log('====================================');
//     }
//     const reserveGelocation = async () => {
//         console.log('Koordinates');
//         console.log(location?.coords.longitude)
//         console.log(location?.coords.latitude);
//         if (location?.coords.longitude && location?.coords.latitude) {
//             const reservGeo = await Location.reverseGeocodeAsync({
//                 longitude: location?.coords.longitude,
//                 latitude: location?.coords.latitude
//             })
//             console.log('====================================');
//             console.log('reserv result', reservGeo);
//             console.log('====================================');
//         }
//     }
//     return (
//         <View>
//             <TextInput value={address} onChangeText={setAddress} placeholder='Address' />
//             <Button title='Geocode address' onPress={geoCode} />
//             <Button title='reverse geo' onPress={reserveGelocation} />
//             <Text className='border'>AzAddress </Text>
//         </View>
//     )
// }

// export default AzAddress