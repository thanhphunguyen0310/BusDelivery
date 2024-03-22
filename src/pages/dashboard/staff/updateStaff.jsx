import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../../lib/api/axiosClient";
import axios from "axios";

const UpdateStaff = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { id } = useParams();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [dataOffice, setDataOffice] = useState();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        gentle: "",
        roleId: "",
        identity: "",
        phoneNumber: "",
        officeId: "",
        avatar: null,
        isActive: ""
    });

    useEffect(() => {
        axiosClient.get(`Api/V1/User/${id}`)
            .then(res => {
                setData(res.data.data);
                console.log(res.data.data, "data")
            })
            .catch(err => console.log(err));
    }, [id]);
    useEffect(() => {
        axiosClient.get(`Api/V1/Office?Status=true&PageIndex=1&PageSize=10`)
            .then(res => {
                setDataOffice(res.data.data.items);
                console.log(res.data.data.items, "data office")
            })
            .catch(err => console.log(err));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('gentle', data.gentle);
        formData.append('roleId', data.roleId);
        formData.append('identity', data.identity);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('officeId', data.officeId);
        formData.append('isActive', data.isActive);
        formData.append('avatar', avatar); // Append the avatar file

        axios.put(`https://busdeliveryapi.azurewebsites.net/Api/V1/User/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                alert("User's data updated successfully!");
                navigate("/dashboard/staff");
            })
            .catch(error => {
                console.error("Error updating user data:", error);
            });
    }

    return (
        <div className="create-form">
            <Box m="20px">
                <form onSubmit={handleSubmit}>
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
                            value={data.name}
                            onChange={e => setData({ ...data, name: e.target.value })}
                            name="name"
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* Email */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="email"
                            label="Email"
                            value={data.email}
                            onChange={e => setData({ ...data, email: e.target.value })}
                            name="email"
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* Password */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="Mật khẩu"
                            value={data.password}
                            onChange={e => setData({ ...data, password: e.target.value })}
                            name="password"
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* Gender */}
                        <FormControl sx={{ gridColumn: "span 2" }} >
                            <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gentle"
                                value={data.gentle}
                                onChange={e => setData({ ...data, gentle: e.target.value })}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Nam" />
                                <FormControlLabel value="2" control={<Radio />} label="Nữ" />
                                <FormControlLabel value="3" control={<Radio />} label="Khác" />
                            </RadioGroup>
                        </FormControl>
                        {/* Role */}
                        <FormControl sx={{ gridColumn: "span 2" }} >
                            <FormLabel id="demo-row-radio-buttons-group-label">Chức vụ</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="roleId"
                                value={data.roleId}
                                onChange={e => setData({ ...data, roleId: e.target.value })}
                            >
                                <FormControlLabel value="2" control={<Radio />} label="Quản lí CH" />
                                <FormControlLabel value="3" control={<Radio />} label="Nhân viên" />
                            </RadioGroup>
                        </FormControl>

                        {/* isActive */}
                        <FormControl sx={{ gridColumn: "span 2" }} >
                            <FormLabel id="demo-row-radio-buttons-group-label">Trạng thái</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="isActive"
                                value={data.isActive}
                                onChange={e => setData({ ...data, isActive: e.target.value })}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Hoạt động" />
                                <FormControlLabel value="2" control={<Radio />} label="Nghỉ" />
                            </RadioGroup>
                        </FormControl>
                        {/* Identity */}
                        <TextField
                            variant="filled"
                            type="number"
                            label="CMND/CCCD"
                            value={data.identity}
                            onChange={e => setData({ ...data, identity: e.target.value })}
                            name="identity"
                            sx={{ gridColumn: "span 2", width: "90%" }}
                        />
                        {/* Phone Number */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Số điện thoại"
                            value={data.phoneNumber}
                            onChange={e => setData({ ...data, phoneNumber: e.target.value })}
                            name="phoneNumber"
                            sx={{ gridColumn: "span 2", width: "90%" }}
                        />
                        {/* Office */}
                        <FormControl sx={{ gridColumn: "span 4" }}>
                            <InputLabel id="officeId">Văn phòng</InputLabel>
                            <Select
                                labelId="officeId"
                                id="officeId"
                                value={data.officeId}
                                onChange={e => setData({ ...data, officeId: e.target.value })}
                                fullWidth
                                label="Văn phòng"
                            >
                                {dataOffice && dataOffice.map(office => (
                                        <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        {/* Avatar */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="file"

                            onChange={e => {
                                console.log(e.target.files[0])
                                setAvatar(e.target.files[0])
                            }}
                            name="avatar"
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>
                    {/* Buttons */}
                    <Box display="flex" justifyContent="space-between" mt="20px" >
                        <Link to="/dashboard/staff">
                            <Button color="primary" variant="contained">
                                Back
                            </Button>
                        </Link>
                        <Button type="submit" color="primary" variant="contained">
                            Update User
                        </Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
}

export default UpdateStaff;
