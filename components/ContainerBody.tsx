"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const ContainerBody: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        py-14
        border-b-[1px]
        px-2
      "
    >
      {children}
    </div>
  );
};

export default ContainerBody;
