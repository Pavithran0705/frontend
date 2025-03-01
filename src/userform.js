import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ onUserAdded }) => {
    const initialValues = { name: "", email: "", age: "", gender: "" };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        age: Yup.number().min(1, "Age must be positive").max(100, "Age too high").required("Age is required"),
        gender: Yup.string().oneOf(["Male", "Female", "Others"], "Invalid gender").required("Select a gender"),
    });

    const handleSubmit = (values, { resetForm }) => {
        axios.post("http://localhost:5000/users", values)
            .then(response => {
                onUserAdded(response.data);  // Update the user list
                resetForm();  // Clear form fields
            })
            .catch(error => console.error("Error adding user:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Add New User</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className="p-4 border rounded shadow-sm">
                        <div className="mb-2">
                            <Field type="text" name="name" className="form-control" placeholder="Enter Name" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-2">
                            <Field type="email" name="email" className="form-control" placeholder="Enter Email" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="mb-2">
                            <Field type="number" name="age" className="form-control" placeholder="Enter Age" />
                            <ErrorMessage name="age" component="div" className="text-danger" />
                        </div>
                        <div className="mb-2">
                            <Field as="select" name="gender" className="form-control">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? "Submit" : "Add User"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserForm;
