import useForm from "./useForm";

const Form = () => {
    const init = {
        name: "",
        email: "",
        agree: false,
    };

    const validate = (values) => {
        const errors = {};

        if (values.name === "") {
            errors.name = "Name is required";
        }

        if (values.email === "") {
            errors.email = "Email is required";
        }

        if (!values.agree) {
            errors.agree = "Must agree to submit!";
        }

        return errors;
    };

    const onSubmit = (values) => {
        setTimeout(() => {
            setIsSubmitting(false);
        }, 500);

        console.log(values);
    };

    const {
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
    } = useForm({ init, validate, onSubmit });

    console.log({ errors });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <label htmlFor="name">
                <span>Name</span>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </label>
            {touched.name && errors.name && (
                <p style={{ color: "red" }}>{errors.name}</p>
            )}

            <label htmlFor="email">
                <span>Email</span>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </label>
            {touched.email && errors.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
            )}

            <label htmlFor="agree">
                <span>Agree</span>
                <input
                    type="checkbox"
                    name="agree"
                    checked={values.agree}
                    onChange={handleCheck}
                    onBlur={handleBlur}
                />
            </label>
            {touched.agree && errors.agree && (
                <p style={{ color: "red" }}>{errors.agree}</p>
            )}

            <div>
                <button
                    disabled={!isValid || isSubmitting}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Form;
