import React, {useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, withFormik } from 'formik';
import * as Yup from "yup";

const MyForm1 = ({ values, touched, errors, handleChanges, status }) => {
    const [ users, setUsers ] = useState([]);

    useEffect(() =>{
        status && setUsers(users => [...users, status])
    }, [status]);

            return(
                <div className="Form-Container">
                    {users.map((user) => {
                        console.log(user)
                        return(
                            <div>{user}</div>
                        );
            })}
                <Form>
                    <div className="box">
                        <label>Name
                        <Field
                            type="text"
                            name="name"
                            placeholder="enter name"
                            value={values.name}
                        />
                        </label>
                        {touched.name && errors.name && <p>{errors.name}</p>}
                    </div>

                <div className="box">
                <label>Email
                    <Field
                        type="text"
                        name="email"
                        placeholder="enter email"
                        value={values.email}
                    />
                    </label>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                </div>

                <div className="box">
                <label>Password
                    <Field
                        type="text"
                        name="password"
                        placeholder="enter password"
                        value={values.password}
                    />  
                    </label> 
                    {touched.password && errors.password && <p>{errors.password}</p>}            
                </div>

                <span>
                    <p className="terms">Do you agree with the Terms of Service?<Field component="input" type="checkbox" name="terms" onChange={handleChanges} value={values.terms}/></p>
                </span>
                    <input className="sub-btn" type="submit" />
                </Form>
                </div>
            );
};

const MyForm2 = withFormik({
    mapPropsToValues({ name, email, password, terms, users }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        terms: terms || false,
        users: [users] || []
      };
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter a name"),
      email: Yup.string().required("Please enter an email"),
      password: Yup.string().required("Enter a password!"),
      terms: Yup.boolean().required("Please agree to the terms of agreement")
    }),

    handleSubmit(values, {setStatus}){
      axios 
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res);
          setStatus(res.data.name)
        })
        .catch(err => {
          console.log(err);
        });
    }
})(MyForm1);
console.log(MyForm2);

export default MyForm2;