/**
 * @Author : Cristian Escobar,   @date 2024-07-24 08:49:13
 * @description : Este componente Profile permite al usuario ver y editar su información de perfil, incluyendo la posibilidad de cambiar su imagen de perfil y su contraseña. Utiliza varios componentes y contextos para gestionar la autenticación y el manejo de formularios.
 * @Props : No recibe props, pero utiliza varios contextos y referencias para gestionar el estado y las acciones del usuario.
 * @return : Un componente de perfil que muestra la información del usuario, permite cambiar la imagen de perfil y abrir un modal para cambiar la contraseña.
 */


// Profile.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import MyModal from "./modal";
import UserInfo from "./userInfo";
import ChangePasswordForm from "./changePasswordForm";
import { AuthContext } from "../../../context/AuthContext";
import { Toaster, toast } from 'sonner';
import SubscriptionInfo from "./suscriptionInfo";

const defaultAvatar = "https://www.w3schools.com/w3images/avatar2.png"; // URL imagen predeterminada

const Profile = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    const { fetchUserData, updateProfileImage } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(defaultAvatar);

    const [subscriptionInfo, setSubscriptionInfo] = useState({
        plan: "Basic",
        expirationDate: "2024-12-31",
        benefits: ["Benefit 1", "Benefit 2"],
    });


    /**
     @UpdatedBy : Cristian Rueda,   @date 2024-09-26 17:46:36
     * @description :Apartado para traer la foto del perfil dado que el usuario se registre con Email (Traer iamgen predeterminada).
                    SubscriptionInfo usado para traer en el perfil la informacion del plan que esta menejando el usuario
     */
    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await fetchUserData();
                setUser(userData);
                setAvatar(userData.info.profile_picture || defaultAvatar);

                if (userData.membership) {
                    setSubscriptionInfo({
                        plan: userData.membership.type_membership,
                        expirationDate: userData.membership.limit_date,
                        benefits: userData.membership.benefits || [],
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchData();
    }, [fetchUserData]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = await changeProfilePicture(file);
            if (result.success) {
                updateProfileImage();
                toast.success('Profile picture successfully changed');
            } else {
                console.error('Error when changing profile picture:', result.error);
                toast.error('Error changing profile picture');
            }
        }
    };

    return (
        <div className="bg-white flex justify-center items-center mt-10 mx-4 lg:mx-20 rounded-3xl">
            <div className="flex flex-col lg:flex-row lg:w-11/12 mx-2 lg:mx-8 my-8 lg:my-16 rounded-3xl bg-MyBlack lg:min-h-[30vh] sm:min-h-[40vh]">
                <div className="border-solid lg:border-MyGray lg:border-r flex flex-col lg:w-4/12 justify-center items-center">
                    <a className="mt-0 text-xl p-2">{user?.info?.rol === 'CLIENT' ? 'User Settings' : 'Admin Settings'}</a>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                    <img
                        src={avatar}
                        className="mx-8 my-8 w-32 h-32 rounded-full cursor-pointer"
                        alt="Profile"
                        onClick={() => fileInputRef.current.click()}
                    />
                </div>
                <div className="flex flex-col lg:w-8/12">
                    <div className="flex justify-between p-4 lg:p-16 text-MyGray"> {/* Alineación horizontal */}
                        <div className="flex-1"> {/* Espacio flexible para UserInfo */}
                            <UserInfo setUser user />
                        </div>
                        <div className="w-1/3 ml-4"> {/* Ajusta el ancho y el margen aquí */}
                            <SubscriptionInfo 
                                plan={subscriptionInfo.plan}
                                expirationDate={subscriptionInfo.expirationDate}
                                benefits={subscriptionInfo.benefits}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full h-2/6 pb-3 space-x-4">
                        <Button
                            className="h-12 lg:w-48 mt-6 rounded-3xl"
                            style={{ backgroundColor: "#3C6E71", color: "#D9D9D9" }}
                            onClick={() => setModalIsOpen(true)}
                        >
                            Edit Password
                        </Button>
                        <MyModal
                            actions={[
                                {
                                    label: "Confirm",
                                    onClick: () => {
                                        formRef.current.submitForm();
                                    },
                                },
                                {
                                    label: "Cancel",
                                    onClick: () => {
                                        setModalIsOpen(false);
                                    },
                                    color: "error",
                                    variant: "contained",
                                    style: { color: "white" },
                                },
                            ]}
                            open={modalIsOpen}
                            title={<h1>EDIT PASSWORD</h1>}
                            onClose={() => setModalIsOpen(false)}
                        >
                            <ChangePasswordForm formRef={formRef} setModalIsOpen={setModalIsOpen} />
                        </MyModal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
