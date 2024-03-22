import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Tab, Tabs, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../lib/api/axiosClient";
import axios from "axios";

const CreateStaff = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [tab, setTab] = React.useState(1);
    const handleChangeTab = (event, newTab) => {
        setTab(newTab);
    };
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        roleId: "",
        officeId: "",
        password: "",
        name: "",
        email: "",
        phoneNumber: "",
        identity: "",
        gentle: "",
        avatar: null
    })
    const [dataOffice, setDataOffice] = useState();
    const [uploadAvatar, setUploadAvatar] = useState(null);


    console.log(inputData, "input data")
    // Tạo một đối tượng FormData mới

    const handleFormSubmit = (event) => {
        event.preventDefault()

        console.log(uploadAvatar, "avatar")

        let formData = new FormData();

        // Thêm từng trường dữ liệu vào formData
        formData.append('roleId', inputData.roleId);
        formData.append('officeId', inputData.officeId);
        formData.append('password', inputData.password);
        formData.append('name', inputData.name);
        formData.append('email', inputData.email);
        formData.append('phoneNumber', inputData.phoneNumber);
        formData.append('identity', inputData.identity);
        formData.append('gentle', inputData.gentle);
        formData.append('avatar', uploadAvatar)

        axios.post(`https://busdeliveryapi.azurewebsites.net/Api/V1/User`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(response => {
                alert("Data Added Successfully!")
                navigate("/dashboard/staff")
            })
            .catch(error => {
                console.log(error.response, "error")
            });

    };
    useEffect(() => {
        axiosClient.get(`Api/V1/Office?Status=true&PageIndex=1&PageSize=10`)
            .then(res => {
                setDataOffice(res.data.data.items);
                console.log(res.data.data.items, "data office")
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            {/* navigate bar */}
            <div className="header-navigate">
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs
                        value={tab}
                        onChange={handleChangeTab}
                        centered>
                        <Tab label="Danh Sách Nhân Viên" onClick={() => navigate("/dashboard/staff")} />
                        <Tab label="Tạo mới nhân viên" />
                    </Tabs>
                </Box>
            </div>

            {/* form data */}
            <div className="create-form">
                <Box m="20px">
                    <form onSubmit={handleFormSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            {/* Name */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Họ và Tên"
                                onChange={e => setInputData({ ...inputData, name: e.target.value })}
                                name="name"
                                required
                                // error={!!touched.name && !!errors.name}
                                // helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onChange={e => setInputData({ ...inputData, email: e.target.value })}
                                name="email"
                                required
                                // error={!!touched.email && !!errors.email}
                                // helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            {/* password */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Mật khẩu"
                                onChange={e => setInputData({ ...inputData, password: e.target.value })}
                                name="password"
                                required
                                // error={!!touched.password && !!errors.password}
                                // helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                            {/* gentle */}
                            <FormControl sx={{ gridColumn: "span 2" }} >
                                <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="gentle"
                                    required
                                    label="Giới tính"
                                    onChange={e => setInputData({ ...inputData, gentle: e.target.value })}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="2" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="3" control={<Radio />} label="Khác" />
                                </RadioGroup>
                            </FormControl>
                            {/* role */}
                            <FormControl sx={{ gridColumn: "span 2" }} >
                                <FormLabel id="demo-row-radio-buttons-group-label">Chức vụ</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="roleId"
                                    label="Chức vụ"
                                    required
                                    onChange={
                                        e => setInputData({ ...inputData, roleId: e.target.value })
                                    }
                                >
                                    <FormControlLabel value="2" control={<Radio />} label="Quản lí CH" />
                                    <FormControlLabel value="3" control={<Radio />} label="Nhân viên" />
                                </RadioGroup>
                            </FormControl>
                            {/* identity */}
                            <TextField
                                variant="filled"
                                type="number"
                                label="CMND/CCCD"
                                required
                                onChange={e => setInputData({ ...inputData, identity: e.target.value })}
                                name="identity"
                                // error={!!touched.identity && !!errors.identity}
                                // helperText={touched.identity && errors.identity}
                                sx={{ gridColumn: "span 2", width: "90%" }}
                            />
                            {/* phoneNumber */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Số điện thoại"
                                required
                                onChange={e => setInputData({ ...inputData, phoneNumber: e.target.value })}
                                name="phoneNumber"
                                // error={!!touched.identity && !!errors.identity}
                                // helperText={touched.identity && errors.identity}
                                sx={{ gridColumn: "span 2", width: "90%" }}
                            />

                            {/* office */}
                            <FormControl sx={{ gridColumn: "span 4" }}>
                                <InputLabel id="officeId">Văn phòng</InputLabel>
                                <Select
                                    labelId="officeId"
                                    id="officeId"
                                    value={inputData.officeId} // Set the value here
                                    onChange={e => setInputData({ ...inputData, officeId: e.target.value })}
                                    fullWidth
                                    label="Văn phòng"
                                    required
                                >
                                    {dataOffice && dataOffice.map(office => (
                                        <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                            {/* avatar */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="file"
                                required
                                onChange={e => {
                                    // console.log(e.target.files[0])
                                    setUploadAvatar(e.target.files[0])
                                }
                                }
                                name="avatar"
                                sx={{ gridColumn: "span 4" }}
                            />

                        </Box>

                        {/* button */}
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="primary" variant="contained">
                                Tạo Người Dùng Mới
                            </Button>
                        </Box>
                    </form>
                </Box>
            </div>
        </>
    );
}

export default CreateStaff;