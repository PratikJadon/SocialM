import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useState } from "react";

function GlowInput({
  parentClass,
  inputClass,
  inputName,
  inputPlaceholder,
  inputValue,
  inputType,
  inputOnChange,
}) {
  const [visible, setVisible] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const radius = 100;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const inputVariants = {
    active: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        damping: 14,
        stiffness: 300,
      },
    },
    inactive: {
      opacity: 0,
      x: 100,
      transition: {
        type: "spring",
        duration: 0.4,
        damping: 14,
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={
        parentClass
          ? parentClass
          : `w-4/5 p-[2px] rounded-lg transition duration-300`
      }
      onMouseMove={handleMouseMove}
      style={{
        background: useMotionTemplate`
                  radial-gradient(
                    ${
                      visible ? radius + "px" : "0px"
                    } circle at ${mouseX}px ${mouseY}px,
                    #766DE9 ,
                    transparent 80%
                  )
                `,
      }}
    >
      <motion.input
        className={
          inputClass
            ? inputClass
            : "rounded-lg outline-none p-2 w-full bg-lightBlack"
        }
        name={inputName}
        placeholder={inputPlaceholder}
        value={inputValue}
        type={inputType ? inputType : "text"}
        onChange={(e) => inputOnChange(e)}
        variants={inputVariants}
        initial="inactive"
        animate="active"
        exit="inactive"
      />
    </motion.div>
  );
}

export default GlowInput;
