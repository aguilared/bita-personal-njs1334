import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import WYSIWYGEditor from "./WYSIWYG";

type Inputs = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  description: string;
  event_date: string;
  image: boolean;
};

const BitaEventEdit = (props: any): JSX.Element => {
  const {
    bitacoraSeleccionada2,
    onSubmitE,
    handleOnChangeE,
    handleOnChange,
    typeEvents1,
    eventsId,
    setEventId,
  } = props;
  console.log("bitacoraSeleccionada2", bitacoraSeleccionada2);
  console.log("typeEvents1", typeEvents1);
  console.log("EventsId", eventsId);

  const [isImage, setIsImage] = useState(bitacoraSeleccionada2.image);

  const handleOnChange1 = () => {
    setIsImage(!isImage);
    handleOnChangeE("image", !isImage);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form
      name="edit"
      className="w-full max-w-lg  bg-gray-200 shadow-md rounded"
      onSubmit={handleSubmit(onSubmitE)}
    >
      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="id"
        >
          Tipos Events
        </label>
        <Controller
          name="tipo_event_id"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = typeEvents1.find(
              (c) => c.value === bitacoraSeleccionada2.tipo_event_id
            );
            console.log("CurrentSelection", currentSelection);
            const handleSelectChange = (
              selectedOption: tipo_event_id | null
            ) => {
              onChange(selectedOption?.value);
            };
            return (
              <Select
                inputRef={ref}
                options={typeEvents1}
                defaultValue={currentSelection}
                name={name}
                onChange={(val) => {
                  onChange(val.value);
                  setEventId(val.value);
                  handleOnChange("tipo_event_id", val.value);
                }}
              />
            );
          }}
        />
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="events_id"
        >
          Event
        </label>
        <Controller
          name="events_id"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection3 = eventsId.find(
              (c) => c.value === bitacoraSeleccionada2.events_id
            );
            return (
              <Select
                inputRef={ref}
                options={eventsId}
                defaultValue={currentSelection3}
                name={name}
                onChange={(val) => {
                  onChange(val.value);
                  handleOnChange("events_id", val.value);
                }}
              />
            );
          }}
        />
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="description"
        >
          Descripcion evento
        </label>

        <Controller
          name="description"
          control={control}
          defaultValue={
            bitacoraSeleccionada2 && bitacoraSeleccionada2.description
          }
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <WYSIWYGEditor
              onChange={(value) => handleOnChangeE("description", value)}
              onBlur={onBlur} // notify when input is touched/blur
              selected={value}
              rows={14}
            />
          )}
        />

        {errors.description && errors.description}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="event_date"
        >
          Fecha Evento
        </label>
        <input
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          type="text"
          placeholder="Date Event"
          name="event_date"
          defaultValue={
            bitacoraSeleccionada2 && bitacoraSeleccionada2.event_date
          }
          {...register("event_date", {
            required: "Required",
            minLength: 3,
            maxLength: 41,
          })}
          onChange={(e) => handleOnChangeE("event_date", e.target.value)}
        />
        {errors.event_date && errors.event_date}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <input
          type="checkbox"
          id="image"
          name="image"
          defaultValue={isImage}
          checked={isImage}
          {...register("image", {
            required: "Required",
          })}
          onChange={(val) => {
            handleOnChange1();
          }}
        />
        Image
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        Above checkbox is {isImage ? "checked" : "unchecked"}.
      </div>

      <input
        type="hidden"
        name="bitacora_id"
        defaultValue={
          bitacoraSeleccionada2 && bitacoraSeleccionada2.bitacora_id
        }
        {...register("bitacora_id", {
          required: "Required",
          minLength: 3,
          maxLength: 41,
        })}
      ></input>
    </form>
  );
};

export default BitaEventEdit;
