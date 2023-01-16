import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Icon } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { ImLocation } from 'react-icons/im'
import axios from "axios"
import { useEffect, useState } from "react"
import { Weather } from "./Weather"
import { ChartComponents } from "./Chart"


const geoLocation = (pos: any) => {

    const crd = pos.coords

    // return crd.latitude , crd.longitude

    const location: location = {
        lat: crd.latitude,
        long: crd.longitude
    }

    localStorage.setItem('location', JSON.stringify(location))

}

function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

interface location {
    lat: number,
    long: number
}


export const SearchComponents = () => {
    const [locationDetail, setLocationDetail] = useState<string>("")
    const [weatherDetail, setWeatherDetail] = useState<Array<void>>([])
    const [dayWeatherDetail, setDayWeatherDetail] = useState<Array<void>>([])
    const value = localStorage.getItem('location') || {}
    let location: location;
    if (typeof value === 'string') {
        location = JSON.parse(value)
    }

    useEffect(() => {

        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${location.lat}&lon=${location.long}&days=7&key=82ad3aac8c2f434f8acbb9208e364187`)
            .then((res) => setWeatherDetail(res.data))
        axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${location.lat}&lon=${location.long}&key=82ad3aac8c2f434f8acbb9208e364187`)
            .then((res) => setDayWeatherDetail(res.data))

    }, [])


    const getWeatherDetail = async () => {

        const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${locationDetail}&days=7&units=S&key=82ad3aac8c2f434f8acbb9208e364187`)
        const res = await data

        setWeatherDetail(res)

        const value = await axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${locationDetail}$units=S&key=82ad3aac8c2f434f8acbb9208e364187`)
        const dataRes = await value.data

        setDayWeatherDetail(dataRes)

    }

    return (
        <Box>
            <InputGroup my='5%'  >
                <InputLeftElement children={<Icon as={ImLocation} />} />
                <Input value={locationDetail} onChange={(({ target }) => setLocationDetail(target.value))} placeholder="Enter City Name" boxShadow='xs' />
                <InputRightElement onClick={getWeatherDetail} children={<Search2Icon />} />
            </InputGroup>
            <Weather getWeatherDetail={weatherDetail} singleDayDetail={dayWeatherDetail} />
        </Box>
    )
}

navigator.geolocation.getCurrentPosition(geoLocation, error)