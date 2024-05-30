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
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../../constant";
import { setToken } from "../../helpers";
import "./SignIn.scss";
const ScrollToTopOnRender = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
const SignIn = () => {
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
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
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        console.log("I FREAKING RAN");
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome back ${data.user.username}!`);

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
    <div className="signInWrapper">
      <div className="containerWrapperIn">
        <Fragment>
          <ScrollToTopOnRender />
          <Row justify="center" align="middle">
            <Col
              style={{ boxShadow: "rgba(0, 0, 0, 0.109) 0px 5px 80px 5px " }}
              span={colSpan}
            >
              <Card style={{ textAlign: "center" }} title="SIGN IN">
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
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Email address" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login_submit_btn custom-button"
                    >
                      Login {isLoading && <Spin size="small" />}
                    </Button>
                  </Form.Item>
                </Form>
                <Typography.Paragraph className="form_help_text">
                  New to Anciado Furniture? <Link to="/signup">Sign Up</Link>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Fragment>
      </div>
    </div>
  );
};

export default SignIn;
