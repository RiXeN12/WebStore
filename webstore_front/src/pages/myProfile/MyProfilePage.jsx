import React from "react";
import { useSelector } from "react-redux";
import UserImage from "./components/UserImage";
import UserProfileForm from "./components/UserProfileForm";

const MyProfilePage = () => {
    const user = useSelector((store) => store.auth.user);

    if (!user) return null;

    return (
        <>
            {user && (
                <div className="container my-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-purple text-white" style={{ backgroundColor: "#6a1b9a" }}>
                            <h4 className="mb-0">My Profile</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <UserImage user={user} />
                                </div>
                                <div className="col-md-8">
                                    <UserProfileForm user={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyProfilePage;