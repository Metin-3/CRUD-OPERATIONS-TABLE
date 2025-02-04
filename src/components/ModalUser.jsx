import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    Box,
    Modal,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { postUser, updateUser } from "../redux/userSlice";
import { useEffect } from "react";

const ModalUser = ({ modal, handleClose, userId }) => {

    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();



    useEffect(() => {
        if (!users || users.length === 0) return;

        if (userId) {
            const user = users.find(user => user.id === userId);
            if (user) {
                setValue("name", user.name || "");
                setValue("lastName", user.lastName || "");
                setValue("avatar", user.avatar || "");
                setValue("school", user.school || "");
                setValue("phone", user.phone || "");
                setValue("email", user.email || "");
                setValue("role", user.role || "");
            }
        } else {
            setValue("name", "");
            setValue("lastName", "");
            setValue("avatar", "");
            setValue("phone", "");
            setValue("email", "");
            setValue("role", "");
        }
    }, [userId, users, setValue, reset]);


    //! FORM onsSubmit function
    const onSubmit = async (data) => {
        if (!userId) {
            dispatch(postUser(data));
        } else {
            dispatch(updateUser({ id: userId, ...data }));
        }
        reset();
        handleClose();
    };


    return (
        <Modal open={modal} onClose={handleClose} >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: 500 },
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: "100vh",
                    overflow: "hidden",
                }}
            >

                <IconButton
                    sx={{ position: "absolute", top: 10, right: 10 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>


                <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
                    {userId ? "İstifadəçini Yenilə" : "Yeni İstifadəçi Əlavə Et"}
                </Typography>

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        pr: 1,
                        maxHeight: "85vh",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>

                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Ad daxil edilməlidir",
                                    validate: value => value.trim() !== "" || "Boşluq daxil edilə bilməz",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Ad"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Soyad daxil edilməlidir",
                                    validate: value => value.trim() !== "" || "Boşluq daxil edilə bilməz",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Soyad"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="avatar"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Avatar linki daxil edilməlidir",
                                    validate: value => value.trim() !== "" || "Boşluq daxil edilə bilməz",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Avatar Linki"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.avatar}
                                        helperText={errors.avatar?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="school"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Məktəb daxil edilməlidir",
                                    validate: value => value.trim() !== "" || "Boşluq daxil edilə bilməz",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Məktəb"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.school}
                                        helperText={errors.school?.message}
                                    />
                                )}
                            />


                            <Controller
                                name="phone"
                                control={control}
                                defaultValue="+"
                                rules={{
                                    required: "Telefon nömrəsi daxil edilməlidir",
                                    validate: value => {
                                        const trimmedValue = value.trim();
                                        if (trimmedValue === "") return "Telefon nömrəsi boş ola bilməz";
                                        if (!/^\+[0-9]+$/.test(trimmedValue)) return "Nömrə yalnız '+' və rəqəmlərdən ibarət olmalıdır";
                                        if (trimmedValue.indexOf("+") !== 0) return "'+' yalnız əvvəlində olmalıdır";
                                        if ((trimmedValue.match(/\+/g) || []).length > 1) return "Yalnız bir '+' istifadə edilə bilər";
                                        if (trimmedValue.length !== 13) return "Telefon nömrəsi dəqiq 13 simvol olmalıdır";
                                        return true;
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Telefon +994556666666"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                        inputProps={{
                                            maxLength: 13,
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Email daxil edilməlidir",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Düzgün email daxil edin",
                                    },
                                    validate: value => value.trim() !== "" || "Boşluq daxil edilə bilməz",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Rol Seç</InputLabel>
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Rol seçilməlidir",
                                        validate: value => value.trim() !== "" || "Boşluq daxil edilə bilməz",
                                    }}
                                    render={({ field }) => (
                                        <Select {...field} label="Rol Seç" error={!!errors.role}>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="User">User</MenuItem>
                                            <MenuItem value="Moderator">Moderator</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.role && (
                                    <Typography color="error" variant="caption">
                                        {errors.role?.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                            >
                                {userId ? "İstifadəçini Yenilə" : "Yeni İstifadəçi Əlavə Et"}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalUser;
