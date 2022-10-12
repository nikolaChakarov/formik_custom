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

        setErrors((prev) => {
            delete prev[e.target.name];

            return { ...prev };
        });
    };

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setErrors((prev) => {
            delete prev[e.target.name];

            return { ...prev };
        });
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({
            ...prev,
            [e.target.name]: true,
        }));

        setErrors(validate(values));
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

        setErrors({});

        setIsSubmitting(true);

        onSubmit(values);
    };

    useEffect(() => {
        const testValidation = validate(values);
        if (Object.keys(testValidation).length === 0) {
            setIsValid(true);
        }
    }, [values]);

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
