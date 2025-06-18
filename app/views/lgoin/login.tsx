import { useSessionStorageState } from "ahooks";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router";
import useSWRMutation from "swr/mutation";

type FormField = {
  username: string;
  password: string;
  remember: boolean;
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { trigger } = useSWRMutation(
    "http://localhost:3001/users",
    async (url, { arg }: { arg: FormField }) => {
      const { username, password } = arg
      return fetch(`${url}?username=${username}&password=${password}`).then((res) => res.json());
    }
  );
  const [, setToken] = useSessionStorageState("token", { defaultValue: "" });


  const onFinish = (values: FormField) => {
    trigger(values).then(res => {
        if (res.length > 0) {
          const salt = 'myblog';
          const id = res[0].id;
          const encryptedId = btoa(`${id}${salt}`);
          setToken(encryptedId)
          return navigate("/home")
        }
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<FormField>
        label="username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item<FormField>
        label="password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password></Input.Password>
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
