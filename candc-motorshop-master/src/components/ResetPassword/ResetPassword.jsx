// ResetPassword.js
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
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API } from "../../constant";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the reset code from the URL query parameter
  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    if (!code) {
      setError("Reset code is missing in the URL.");
    }
  }, [code]);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code, // code from the URL
          password: values.password,
          passwordConfirmation: values.confirmPassword,
        }),
      });
      const data = await response.json();

      if (data?.error) {
        throw data?.error;
      } else {
        message.success("Password has been reset successfully!");
        navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="resetPasswordWrapper"
      style={{
        marginTop: "100px",
      }}
    >
      <div className="containerWrapperIn">
        <Row justify="center" align="middle">
          <Col
            style={{ boxShadow: "rgba(0, 0, 0, 0.109) 0px 5px 80px 5px " }}
            span={5}
          >
            <Card style={{ textAlign: "center" }} title="Reset Password">
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
                form={form}
                name="resetPassword"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="New Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your new password",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Enter new password" />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="reset_password_submit_btn custom-button"
                    disabled={!code}
                  >
                    Reset Password {isLoading && <Spin size="small" />}
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph className="form_help_text">
                Remembered your password? <Link to="/signin">Sign In</Link>
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ResetPassword;
