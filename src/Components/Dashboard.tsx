import { Box } from "@chakra-ui/react"
import { SearchComponents } from "./SearchComponents"
import { Weather } from "./Weather"

export const WeatherDashboard = () => {
    return (
        <Box w='50%' m='auto'>
            <SearchComponents />
        </Box>
    )
}