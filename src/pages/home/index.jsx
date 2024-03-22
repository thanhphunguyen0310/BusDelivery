import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StatBox from '../../components/StatBox';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../lib/api/axiosClient';
import { subDays, format } from 'date-fns';
import { formatPrice } from '../../lib/formatPrice';
import ReactMapGL, { Marker } from 'react-map-gl';
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
export default function HomePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState([]);
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    fetchData();
    fetchOfficeData();
    fetchRecentTransaction();
  }, []);

  //call api for new user/month total order/month total office
  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`Api/V1/Dashboard`);
      setValue(response.data.data);
      console.log(response.data.data, "data res")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Lấy ngày hôm nay
  const today = new Date();
  //call api for recent transaction
  const fetchRecentTransaction = async () => {
    try {
      const fromDateFormatted = format(subDays(today, 29), 'dd-MM-yyyy');
      const toDateFormatted = format(today, 'dd-MM-yyyy');
      const response = await axiosClient.get(`Api/V1/Package`, {
        params: {
          fromDate: fromDateFormatted,
          toDate: toDateFormatted,
          pageIndex: 1,
          pageSize: 10
        }
      });
      setTransaction(response.data.data.items);
      console.log(response.data.data.items, "trans response")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [dataOffice, setDataOffice] = useState([]);
  //call api get lat long Office
  const fetchOfficeData = async () => {
    try {
      const response = await axiosClient.get(`Api/V1/Office`, {
        params: {
          Status: true,
          pageIndex: 1,
          pageSize: 20
        }
      });
      setDataOffice(response.data.data.items)
      console.log(response.data.data.items, "data office")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: 10.8231,
    longitude: 106.6297,
    zoom: 10,
  });

  // function handleDbClick(e) {
  //   const [longitude, latitude] = e.lngLat;
  //   setNewPlace({
  //     lat: e?.lngLat?.lat,
  //     lng: e?.lngLat?.lng,
  //   });
  // }
  return (
    <div className='h-screen w-full' style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div className='flex-grow flex'>
        <Sidebar />
        <Box m="20px" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1200px' }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            width="100%"
          >
            {/* ROW 1 */}

            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={value.totalUser}
                subtitle="Nhân viên mới"
                progress="0.75"
                increase="+14%"
                icon={
                  <AccountCircleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={value.totalOrder}
                subtitle="Đơn hàng trong tháng"
                progress="0.50"
                increase="+21%"
                icon={
                  <LocalShippingIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 4"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={value.totalOffice}
                subtitle="Tổng số văn phòng"
                // progress="0.30"
                // increase="+5%"
                icon={
                  <HomeWorkIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              style={{ position: 'relative' }}
            >
              <ReactMapGL
                {...viewPort}
                mapboxAccessToken="pk.eyJ1IjoidGhhbmhwaHUwMyIsImEiOiJjbHUxb2poamgwbTdrMmtwZDVodmo0YzE5In0.aC9YV3Q4Qw7R2vom0JDR6g"
                width="100%"
                height="100%"
                transitionDuration='200'
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => setViewPort(viewport)}
                
              >
                {/* {dataOffice.map((office, index) => (
                  <Marker
                    key={index}
                    latitude={office.lat}
                    longitude={office.lng}
                    offsetLeft={-3.5 * viewPort.zoom}
                    offsetTop={-7 * viewPort.zoom}
                  >
                    <div style={{ color: 'red', fontSize: '20px' }}>📍</div>
                  </Marker>
                ))} */}
              </ReactMapGL>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Giao dịch gần đây
                </Typography>
              </Box>
              {transaction.map((transaction, i) => (
                <Box
                  key={`${transaction.id}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      ID: {transaction.id}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      Sản phẩm: {transaction.quantity}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="800" color={colors.grey[100]}>
                      {transaction.createTime}
                    </Typography>
                    <Box
                      backgroundColor={colors.greenAccent[500]}
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      {formatPrice(transaction.totalPrice || 0)}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ROW 3 */}

          </Box>
        </Box>
      </div>
    </div>
  )
}
