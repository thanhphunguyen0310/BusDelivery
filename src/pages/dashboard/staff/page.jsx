import React, { useEffect, useState } from "react";
import { Box, Button, Pagination, TablePagination, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { axiosClient } from "../../../lib/api/axiosClient";

const ManageStaff = () => {
    const [users, setUsers] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(8); // Change page size to 5
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = useState(0);



    const handleChangePage = (event, newPage) => {
        setPageIndex(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageIndex(0); // Reset pageIndex to 0 when changing pageSize
    };
    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize]);

    const fetchData = async () => {
        try {
            const response = await axiosClient.get(`Api/V1/User?pageIndex=${pageIndex}&pageSize=${pageSize}`);
            setUsers(response.data.data.items);
            console.log(response.data, "data res")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/dashboard/createStaff");
    };

    // Delete function
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Do you want to delete this user?");
        if (confirmDelete) {
            axiosClient.delete(`Api/V1/User/${id}`)
                .then(res => {
                    alert("Record has been deleted successfully.");
                    fetchData();
                })
                .catch(err => {
                    console.error("Error deleting user:", err);
                    alert("An error occurred while deleting the user.");
                });
        }
    };

    return (
        <div>
            <div className="header-navigate">
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                    >
                        <Tab label="Danh Sách Nhân Viên" />
                        <Tab label="Tạo mới nhân viên" onClick={handleClick} />
                    </Tabs>
                </Box>
            </div>
            <div className="data-table" style={{ overflowX: 'auto', margin: '0 20px', maxWidth: '90vw' }}>
                <Box
                    sx={{
                        overflowX: 'auto',
                    }}
                    m="40px 0 0 0"
                    height="75vh"
                >
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{
                            backgroundColor: "#F0F3F2",
                            borderRadius: "20px",
                            position: "sticky",
                            top:0,
                            zIndex: 999,

                        }}>
                            <tr style={{ marginBottom: "20px" }}>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Avatar</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>ID</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Họ và tên</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Giới tính</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Số điện thoại</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>CMND/CCCD</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Phòng ban</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Chức vụ</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Trạng thái</th>
                                <th style={{ padding: '8px', fontSize: '20px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#DAF5FB' : '#F0F7F7' }}>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>
                                        <img src={`data:image/png;base64,${user.avatar}`} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                    </td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>{user.id}</td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>{user.name}</td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>{user.gentle === 1 ? 'Nam' : (user.gentle === 2 ? 'Nữ' : 'Khác')}</td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>{user.phoneNumber}</td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>{user.identity}</td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>{user.officeId}</td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>
                                        {user.roleId === 1 ? 'Quản lí' : user.roleId === 2 ? 'Quản lí CH' : 'Nhân viên'}
                                    </td>
                                    <td style={{ padding: '4px', fontSize: "15px" }}>
                                        <Typography color={user.isActive ? colors.blueAccent?.[500] : colors.redAccent?.[500]}>
                                            {user.isActive ? 'Hoạt động' : 'Nghỉ'}
                                        </Typography>
                                    </td>
                                    <td style={{ padding: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link to={`/dashboard/updateStaff/${user.id}`} style={{ marginRight: '8px' }}>
                                                <FaPen color="#26a1f4" />
                                            </Link>
                                            <Button onClick={() => handleDelete(user.id)}>
                                                <FaTrash color="#e9404d" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
                <Box>
                    <TablePagination
                        component="div"
                        count={50} // Total number of items
                        page={pageIndex}
                        onPageChange={handleChangePage}
                        rowsPerPage={pageSize}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </div>
        </div>
    );
};

export default ManageStaff;