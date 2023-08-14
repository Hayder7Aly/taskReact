import React from "react";
import { Formik, Field, Form } from "formik";
import "./form.css";
import * as Yup from "yup";
import getData from "../../services/service";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  rate: Yup.string().required("Required"),
  apply: Yup.string().required("Required"),
  input3: Yup.string(),
});

const App = () => {
  const data = getData();
  const dynamicValues = {};

  data.forEach((item) => {
    dynamicValues[item.category] = false;
    item.items.forEach((itm) => {
      dynamicValues[itm.id] = false;
    });
  });

  const initialValues = {
    ...dynamicValues,
    name: "",
    rate: "",
    apply: "",
    search: "",
  };


  const onBinding = (setFieldValue, item, values, category) => {

    item.items.map((itm) => {
      setFieldValue(itm.id, !values[category]);
    });
  };

  const handleSubmit = (values) => {
    const trueKeysArray = Object.keys(values).filter(key => values[key] === true);

    console.log({
        applicable_items: trueKeysArray,
        applied_to : values.apply,
        name : values.name,
        rate : values.rate,
    })
  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="form">
            <h1>Add Tax</h1>
            <div className="input-wrapper">
              <Field type="text" name="name" className="field70" />
              <Field
                type="text"
                name="rate"
                className="field30"
                placeholder="%"
              />
            </div>

            <div className="radio-wrapper">
              <div>
                <Field type="radio" name="apply" id="forAll" value="all" />
                <label htmlFor="forAll">Apply to all items in collection</label>
              </div>
              <div>
                <Field
                  type="radio"
                  name="apply"
                  value="some"
                  id="forSpecific"
                />

                <label htmlFor="forSpecific">Apply to specific items</label>
              </div>
            </div>
            <hr className="hr" />

            <div>
              <Field
                type="text"
                name="search"
                placeholder="Search Items"
                className="search"
              />
            </div>

            <div className="checkbox-wrapper">
              {data.map((item, idx) => {
                return (
                    <div className="checkbox-wrapper" key={idx}>
                    <label className="parentbox">
                      <Field
                        type="checkbox"
                        name={item.category}
                        onClick={() =>
                          onBinding(setFieldValue, item, values, item.category)
                        }
                      />
                      <span>{item.category} </span>
                    </label>

                    {item.items.map((itm) => {
                      return (
                        <div className="wrapper" key={itm.id}>
                          <label>
                            <Field
                              type="checkbox"
                              name={itm.id}
                              onClick={() =>
                                setFieldValue(item.category, false)
                              }
                            />
                            <span>{itm.name} </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="button">
              <button className="btn" type="submit">
                Apply tax to {Object.values(values).filter(value => value === true).length} item{"(s)"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default App;
