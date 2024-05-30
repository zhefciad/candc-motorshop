import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import "./SignUp.scss";

const SignUp = () => {
  const getSize = () => {
    return window.innerWidth;
  };

  const [screenSize, setScreenSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const colSpan = screenSize >= 1024 ? 5 : 18;

  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome to Anciado Furniture ${data.user.username}!`);

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signUpWrapper">
      <div className="containerWrapperUp">
        <Fragment>
          <Row justify="center" align="middle">
            <Col
              style={{ boxShadow: "rgba(0, 0, 0, 0.109) 0px 5px 50px 5px " }}
              span={colSpan}
            >
              <Card title="SIGN UP">
                {error ? (
                  <Alert
                    className="alert_error"
                    message={error}
                    type="error"
                    closable
                    afterClose={() => setError("")}
                  />
                ) : null}
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <div className="formWrapper">
                    <div className="formLeft">
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            type: "string",
                            message: "Username is required",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Username"
                          autoComplete="new-password"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Email is required",
                          },
                        ]}
                      >
                        <Input placeholder="Email address" />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Password is required",
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </Form.Item>
                    </div>

       
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login_submit_btn custom-button"
                      style={{marginTop: "10px"}}
                    >
                      Submit {isLoading && <Spin size="small" />}
                    </Button>
                  </Form.Item>
                </Form>
                <Typography.Paragraph className="form_help_text">
                  Already have an account? <Link to="/signin">Sign In</Link>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Fragment>
      </div>
    </div>
  );
};

export default SignUp;
