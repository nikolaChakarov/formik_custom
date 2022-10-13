import { useState, useEffect } from "react";

const useForm = (props) => {
    const { init, validate, onSubmit } = props;

    const [values, setValues] = useState(init);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleCheck = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    };

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({
            ...prev,
            [e.target.name]: true,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errs = validate(values);
        const isErrs = Boolean(Object.keys(errs).length > 0);

        if (isErrs) {
            setErrors(errs);
            setTouched(errs);
            setIsValid(false);
            return;
        }

        setIsSubmitting(true);

        onSubmit(values);
    };

    useEffect(() => {
        const testValidation = validate(values);
        setErrors(testValidation);

        const isTouched = Object.keys(touched).length > 0;
        const isError = Object.keys(testValidation).length > 0;

        if (!isError) {
            setIsValid(true);
        }

        if (isTouched && isError) {
            setIsValid(false);
        }
    }, [values, touched]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        setIsSubmitting,
        handleCheck,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};

export default useForm;
