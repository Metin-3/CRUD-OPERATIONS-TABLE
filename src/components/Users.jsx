import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, TablePagination, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../redux/userSlice";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ModalUser from "./ModalUser";
import { Spin } from "antd";


const Users = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modal, setModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const { users, loading } = useSelector(state => state.users);
    const dispatch = useDispatch();

    //! GET USERS REDUX FUNCTION 
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch]);


    //! PAGINATION TABLE
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //! CLOSE MODAL
    const handleClose = () => {
        setModal(false);
        setUserId(null);
    }

    //! OPEN MODAL
    const handleOpen = () => {
        setModal(true)
    }

    //! UPDATE USER MODAL
    const updateModal = (id) => {
        setModal(true);
        setUserId(id)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[100vh]">
                <Spin>Loading...</Spin>
            </div>
        )
    }
    return (
        <div className="px-10 flex flex-col items-center justify-center w-full min-h-screen py-20">
            <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
                <Table>

                    <TableHead >
                        <TableRow className="bg-blue-600" style={{ width: '100%', position: 'sticky', left: '0px', }}>
                            <TableCell
                                className="!text-white font-bold text-lg"
                                colSpan={6}
                                style={{ width: '100%', position: 'sticky', left: '0px', }}
                            >
                                User Management
                            </TableCell>
                            <TableCell
                                align="right"
                                className="!text-white font-bold text-lg"
                                style={{ width: '100%', position: 'sticky', right: '0px', }}
                            >
                                <Button
                                    vianart="outlined"
                                    color="success"
                                    onClick={handleOpen}
                                    className="!text-white"
                                    endIcon={<PersonIcon />}
                                >
                                    ADD USER
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-100">
                            <TableCell className="text-white font-bold text-lg sticky left-0 z-10 bg-gray-100">#</TableCell>
                            <TableCell className="text-white font-bold text-lg sticky left-10 z-10 bg-gray-100">İstifadəçi</TableCell>
                            <TableCell className="text-white font-bold text-lg">Email</TableCell>
                            <TableCell className="text-white font-bold text-lg">Phone</TableCell>
                            <TableCell className="text-white font-bold text-lg">School</TableCell>
                            <TableCell className="text-white font-bold text-lg">Rol</TableCell>
                            <TableCell align="right" className="text-white font-bold text-lg">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.length > 0 ? (
                            [...users]
                                .reverse()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, index) => (
                                    <TableRow key={user.id} className="!hover:bg-gray-100 transition-all duration-200">
                                        <TableCell className="sticky left-0 z-10 bg-white">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell className="sticky left-10 z-10 bg-white">
                                            <div className="flex items-center space-x-3">
                                                <Avatar src={user.avatar} alt={user.name} />
                                                <p className="text-gray-900 font-medium">{user.name}</p>
                                                <p className="text-gray-900 font-medium">{user.lastName}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-700">{user.email}</TableCell>
                                        <TableCell className="text-gray-700">{user.phone}</TableCell>
                                        <TableCell className="text-gray-700">{user.school}</TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1 rounded-full text-white text-sm ${user.role === "Admin" ? "bg-red-500" : user.role === "Moderator" ? "bg-yellow-500" : "bg-green-500"}`}>
                                                {user.role}
                                            </span>
                                        </TableCell>
                                        <TableCell align="right" className="text-gray-700">
                                            <div className="flex justify-end gap-3">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => updateModal(user.id)}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button variant="outlined" color="error" onClick={() => dispatch(deleteUser(user.id))}><DeleteIcon /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="py-10 text-gray-500 text-lg font-medium h-[350px]" style={{ textAlign: "center" }}>
                                    Heç bir istifadəçi tapılmadı.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="bg-gray-100"
                    style={{ width: '100%', position: 'sticky', left: '0px', }}
                />

            </TableContainer >

            <ModalUser
                modal={modal}
                handleClose={handleClose}
                userId={userId}
            />
        </div>

    );
};

export default Users;
