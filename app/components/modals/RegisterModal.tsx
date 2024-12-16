'use client'

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Success!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            const result = await signIn('google', {
                callbackUrl: '/',
            });
            
            if (result?.error) {
                toast.error('Failed to sign in with Google');
                console.error('Sign in error:', result.error);
            } else if (result?.ok) {
                toast.success('Logged in successfully!');
                registerModal.onClose();
            }
        } catch (error) {
            console.error('Google Sign-in Error:', error);
            toast.error('Something went wrong with Google sign in');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        try {
            setIsLoading(true);
            const result = await signIn('github', {
                callbackUrl: '/',
            });
            
            if (result?.error) {
                toast.error('Failed to sign in with GitHub');
                console.error('Sign in error:', result.error);
            } else if (result?.ok) {
                toast.success('Logged in successfully!');
                registerModal.onClose();
            }
        } catch (error) {
            console.error('GitHub Sign-in Error:', error);
            toast.error('Something went wrong with GitHub sign in');
        } finally {
            setIsLoading(false);
        }
    };

    const onToggle = () => {
        registerModal.onClose();
        loginModal.onOpen();
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={handleGoogleSignIn}
                disabled={isLoading}
            />
            <Button
                outline
                label="Continue with GitHub"
                icon={AiFillGithub}
                onClick={handleGithubSignIn}
                disabled={isLoading}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={onToggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        ">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;