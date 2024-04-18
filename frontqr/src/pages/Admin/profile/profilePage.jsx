import React, { useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import MyModal from "./modal";
import UserInfo from "./userInfo";
import ChangePasswordForm from "./changePasswordForm";

const Profile = () => {
    const [modalisOpen, setmodalisOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const fileInputRef = useRef(null);
    const formRef = useRef(null);


    const handleModal = () => {
        setmodalisOpen(!modalisOpen);
    };

    const handleCloseModal = () => {
        setmodalisOpen(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const modalActions = [
        {
            label: "Cambiar",
            onClick: () => {
                formRef.current.submitForm();
            },
        },
        {
            label: "Cancelar",
            onClick: () => {
                handleCloseModal();
            },
            color: "error",
            variant: "outlined",
        },
    ];

    return (
        <div class="bg-white flex m-auto rounded-3xl mt-10 w-3/5">
            <div className="border-solid border-MyGray border-r flex flex-col lg:w-4/12 justify-center items-center" style={{ color: "#D9D9D9" }}>
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} ref={fileInputRef} />
                <img src={selectedImage || "https://unavatar.io/kikobeats"} className="mx-8 my-8 w-32 h-32 rounded-full cursor-pointer" alt="Profile" />
                <label className="pb-3"><button onClick={() => fileInputRef.current.click()}><EditIcon /></button></label>
            </div>
            <div className="flex flex-col w-full lg:w-8/12" style={{ margin: "30px" }}>
                <h2 className="text-xl lg:text-2xl m-1">Información del Usuario</h2>
                <div>
                    <UserInfo />
                </div>
                <div className="m-auto pt-4">
                    {/* Mejorando el estilo del botón */}
                    <Button className="h-10 lg:w-48 mt-6 rounded-md" style={{ backgroundColor: "#3C6E71", color: "#FFFFFF" }} onClick={handleModal}>
                        Edit Password
                    </Button>
                    <MyModal actions={modalActions} open={modalisOpen} title={<h1>EDIT PASSWORD</h1>} onClose={handleCloseModal}>
                        <ChangePasswordForm formRef={formRef} />
                    </MyModal>
                </div>
            </div>
        </div>
    );
};

export default Profile;