// ForgotPassword.js
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../constant";
import { toast } from "react-toastify";
import "./ForgotPassword.scss";

const ScrollToTopOnRender = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onForgotPassword = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.ok) {
        console.log("toast!");

        toast.success("Password reset link sent to your email.", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
          classNameName: "custom-toast2",
        });
        navigate("/signin", { replace: true });
      } else {
        setError("Error sending password reset email.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = () => {
    if (email) {
      onForgotPassword();
    } else {
      setError("Please enter your email address.");
    }
  };

  return (
    <div
      className="forgotPasswordWrapper"
      style={{
        marginTop: "100px",
      }}
    >
      <div className="containerWrapperIn">
        <Fragment>
          <ScrollToTopOnRender />
          <Row justify="center" align="middle">
            <Col
              style={{ boxShadow: "rgba(0, 0, 0, 0.109) 0px 5px 80px 5px " }}
              span={5}
            >
              <Card style={{ textAlign: "center" }} title="Forgot Password">
                {error && (
                  <Alert
                    className="alert_error"
                    message={error}
                    type="error"
                    closable
                    afterClose={() => setError("")}
                  />
                )}
                <Form
                  name="forgotPassword"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="forgot_password_submit_btn custom-button"
                      disabled={isLoading}
                    >
                      Send Reset Link {isLoading && <Spin size="small" />}
                    </Button>
                  </Form.Item>
                </Form>
                <Typography.Paragraph className="form_help_text">
                  Remember your password? <Link to="/signin">Sign In</Link>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Fragment>
      </div>
    </div>
  );
};

export default ForgotPassword;
