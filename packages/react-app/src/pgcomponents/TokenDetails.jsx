import React, { useState } from "react";
import { Button, Form, Input } from "antd";

function Details({ onPreviousStep, onNextStep, pgType, handleDeployment, ...props }) {
  const [form] = Form.useForm();
  const [deploying, setDeploying] = useState(false);
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const validateAndDeploy = async () => {
    const values = form.getFieldsValue();
    // TODO: run validation and then continue

    setDeploying(true);
    await handleDeployment(values);
    setDeploying(false);
  };

  const isERC20 = pgType === 1;

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-medium">
          Provide details for your {isERC20 ? "ERC-20" : "ERC-721"} token contract?
        </h1>
        <div className="my-2">Some more description on what details are needed to launch the token.</div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center mx-auto mt-16 max-w-lg">
        <Form
          form={form}
          className="w-full flex flex-col items-center mx-auto justify-center"
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          size="large"
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item
            disabled={deploying}
            label="Project Name"
            name="name"
            required
            tooltip="This is a required field"
            className="w-full"
          >
            <Input placeholder="Simple Public Goods Project" />
          </Form.Item>
          <Form.Item
            disabled={deploying}
            label="Symbol"
            name="symbol"
            tooltip="Tooltip with customize icon"
            className="w-full"
          >
            <Input placeholder="SPGP" />
          </Form.Item>
          <Form.Item
            disabled={deploying}
            label="Total supply"
            name="totalSupply"
            required
            tooltip="Total supply info"
            className="w-full"
          >
            <Input type="number" placeholder={isERC20 ? "100000000" : "10000"} />
          </Form.Item>

          {isERC20 ? (
            "ERC-20 Stuff"
          ) : (
            <>
              <Form.Item
                disabled={deploying}
                label="Base URI"
                name="baseURI"
                required
                tooltip="Base URI info"
                className="w-full"
              >
                <Input placeholder="https://tokens-base-uri..." />
              </Form.Item>
              <Form.Item
                disabled={deploying}
                label="Start mint price"
                name="startPrice"
                required
                tooltip="Start price info"
                className="w-full"
              >
                <Input type="number" placeholder="0.03" addonAfter={<span>Ξ</span>} />
              </Form.Item>
              <Form.Item
                disabled={deploying}
                label="Price inflation rate"
                name="inflation"
                required
                tooltip="Price inflation rate info"
                className="w-full"
              >
                <Input type="number" placeholder="3" min={0} max={100} addonAfter={<span>%</span>} />
              </Form.Item>
            </>
          )}
        </Form>

        <div className="mt-20 flex flex-1 items-center justify-center flex-row">
          <Button size="large" disabled={deploying} onClick={onPreviousStep}>
            Go Back
          </Button>
          <div className="w-4" />
          <Button type="primary" size="large" loading={deploying} disabled={deploying} onClick={validateAndDeploy}>
            Confirm token details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Details;
