import "./style.css";
import {Button, Col, FloatingLabel, Form, Row, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {login} from "../../../Context/Auth/actions";
import {useAuthContext} from "../../../Context/Auth/context";
import {useHistory} from "react-router-dom";

export const Login = () => {

    const { state: { loading, token, user }, dispatch } = useAuthContext();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const history = useHistory();

    const loginHandle = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === undefined || email === null || email === "" || password === undefined || password === null || password === "" ){
            alert('E-mail e senha obrigatórios!');
        }
        else {
            login(email, password, setPassword, dispatch);
        }
    }

    useEffect(function () {
        if (token && user){
            history.push('/admin')
        }
    }, [user, token])

    return (
        <div className="container-page">
            <h3 className='text-danger'>Área Administrativa</h3><br/>
            <Form onSubmit={loginHandle}>
                <fieldset disabled={loading}>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.FloatingLabel
                                    controlId="floatingInput"
                                    label="E-mail"
                                >
                                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={'E-mail'}/>
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.FloatingLabel
                                    controlId="floatingPassword"
                                    label="Senha"
                                >
                                    <Form.Control type={'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={'Senha'}/>
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
                <div className={'text-center p-5'}>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        disabled={loading}
                    >
                        Entrar
                    </Button>
                </div>
            </Form>
        </div>
    )
}