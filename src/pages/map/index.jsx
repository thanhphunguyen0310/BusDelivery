import { Box } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Map = () => {
    return (
        <div className='h-screen w-full' style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div className='flex-grow flex' style={{justifyContent:"space-between"}}>
                <Sidebar />

        <Box
       
        >



        </Box>
            </div>
        </div>
    );
}

export default Map;