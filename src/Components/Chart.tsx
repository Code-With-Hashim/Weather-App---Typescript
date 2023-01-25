import { Box, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Point,
    PointElement,
    LineElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    PointElement,
    Tooltip,
    Legend
);

type weatherProps = {
    singleWeatherDetail: any,
    singleDayDetail: any,
    today_date: string
}

const HourChange = (date: number) => {
    const new_date = new Date(date)
    const hours = new_date.getHours()

    switch (hours) {
        case 13: {
            return `1pm`;
        }
        case 14: {
            return `2pm`;
        }
        case 15: {
            return `3pm`;
        }
        case 16: {
            return `4pm`;
        }
        case 17: {
            return `5pm`;
        }
        case 18: {
            return `6pm`;
        }
        case 19: {
            return `7pm`;
        }
        case 20: {
            return `8pm`;
        }
        case 21: {
            return `9pm`;
        }
        case 22: {
            return `10pm`;
        }
        case 23: {
            return `11pm`;
        }
        case 0: {
            return `12am`;
        }
        case 1: {
            return `1am`;
        }
        case 2: {
            return `2am`;
        }
        case 3: {
            return `3am`;
        }
        case 4: {
            return `4am`;
        }
        case 5: {
            return `5am`;
        }
        case 6: {
            return `6am`;
        }
        case 7: {
            return `7am`;
        }
        case 8: {
            return `8am`;
        }
        case 9: {
            return `9am`;
        }
        case 10: {
            return `10am`;
        }
        case 11: {
            return `11am`;
        }
        case 12: {
            return `12pm`;
        }

        default: {
            return hours
        }

    }
}

type time = {
    max_temp : number,
    timestamp : string | number,
}

export const ChartComponents = (props: weatherProps) => {

    const { singleWeatherDetail, singleDayDetail: { data }, today_date } = props;

    const DayDetail: time[] = []
    data && data.forEach((i: any, index: number) => {
        const [full_data, time] = i.datetime.split(":")

        if (full_data === today_date) {
            DayDetail.push(({
                max_temp: i.app_temp,
                timestamp: HourChange(i.timestamp_local)
            }))

        }
    })


    return (
        <Box>
            <Box boxShadow='base' p='6' rounded='md' w='100%' h={'100%'} m='auto' my='5' >
                <HStack justifyContent={'space-between'}>
                    <Heading size='3xl'>{singleWeatherDetail.app_max_temp}° C</Heading>
                    <Image src={`https://www.weatherbit.io/static/img/icons/${singleWeatherDetail.weather.icon}.png`} />
                </HStack>
                <Line
                    data={{
                        labels: DayDetail.map((i) => i.timestamp),
                        datasets: [{
                            label: "",
                            data: DayDetail.map((i) => i.max_temp),
                            borderWidth: 1,
                            fill: true,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    }}
                    height={400} width={600} />
            </Box>
        </Box>
    )
}
