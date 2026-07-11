import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import userIcon from "../assets/user.png";

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Min 2 characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
});

export default function SignUpModal({ open, onClose }) {
  const { signUp } = useUser();

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <button className="modal-box__close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <img className="modal-box__user-icon" src={userIcon} alt="User" />

        <h2 className="modal-box__title">Sign up</h2>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            signUp(values);
            toast.success(`Welcome, ${values.name}!`);
            resetForm();
            onClose();
          }}
        >
          <Form className="modal-form">
            <div className="modal-form__group">
              <label className="modal-form__label" htmlFor="name">Username</label>
              <Field
                className="modal-form__input"
                id="name"
                name="name"
                type="text"
                placeholder="Username"
              />
              <ErrorMessage name="name" component="span" className="modal-form__error" />
            </div>
            <div className="modal-form__group">
              <label className="modal-form__label" htmlFor="email">E-Mail</label>
              <Field
                className="modal-form__input"
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail"
              />
              <ErrorMessage name="email" component="span" className="modal-form__error" />
            </div>
            <div className="modal-form__group">
              <label className="modal-form__label" htmlFor="password">Password</label>
              <Field
                className="modal-form__input"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="span" className="modal-form__error" />
            </div>
            <button className="modal-form__submit" type="submit">Sign up</button>
          </Form>
        </Formik>

        <p className="modal-box__footer">
          Already have an account?{" "}
          <button type="button" className="modal-box__login-link" onClick={onClose}>
            Log In
          </button>
        </p>
      </Box>
    </Modal>
  );
}
