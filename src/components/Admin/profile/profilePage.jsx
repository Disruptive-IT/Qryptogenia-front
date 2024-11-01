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
    const [isGoogleUser, setIsGoogleUser] = useState(false); // Estado para verificar si es usuario de Google

    const [subscriptionInfo, setSubscriptionInfo] = useState({
        plan: "Basic",
        expirationDate: "2024-12-31",
        benefits: ["Escaneos de Qrs/Mes 10000", "5 Qrs activos"],
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
                                console.log("User Data:", userData);
                    
                                // Verifica si el usuario es de Google y tiene una foto
                                if (userData.info.authProvider === 'google') {
                                    setIsGoogleUser(true);
                                    // Si es usuario de Google, usa la imagen de Google
                                    setAvatar(userData.info.profile_picture || defaultAvatar);
                                } else {
                                    setIsGoogleUser(false);
                                    // Si no es usuario de Google, usa su imagen o la predeterminada si no tiene
                                    setAvatar(userData.info.profile_picture || defaultAvatar);
                                }
                    
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
        <div className=" flex justify-center items-center mt-10 mx-4 lg:mx-20 rounded-3xl ">
            <div className="flex flex-col lg:flex-row lg:w-11/12 mx-2 lg:mx-8 my-8 lg:my-16 rounded-3xl bg-MyBlack lg:min-h-[30vh] sm:min-h-[40vh]">
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                      

                            <SubscriptionInfo 
                                className="subscription-info w-full p-8 rounded-lg "
                                plan={subscriptionInfo.plan}
                                expirationDate={subscriptionInfo.expirationDate}
                                benefits={subscriptionInfo.benefits}
                            />
                        
    <div className="flex flex-col items-center lg:w-8/12 lg:items-start">
            <div className="flex flex-col lg:flex-row lg:justify-between p-4 lg:p-16 text-MyGray items-center lg:items-start">
                
                {/* Foto de perfil */}
                <img
                    src={avatar}
                    className="mx-20 my-8 w-32 h-32 rounded-full cursor-pointer"
                    alt="Profile"
                    onClick={() => fileInputRef.current.click()}
                />

                <div className="w-full mt-4 lg:ml-8 lg:mt-0 lg:w-3/6">
                    <UserInfo setUser={setUser} user={user} />

                    <div className="items-center mt-6 w-full h-2/6 pb-3 space-x-4">
                        {/* Mostrar el botn de Editar Contraseña solo si el usuario no es de Google*/}
                        {!isGoogleUser && (
                            <Button
                                className="h-12 lg:w-48 mt-4 rounded-3xl"
                                style={{ backgroundColor: "#3C6E71", color: "#D9D9D9" }}
                                onClick={() => setModalIsOpen(true)}
                            >
                                Edit Password
                            </Button>
                        )}
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
            </div>
        </div>
    );
};

export default Profile;

