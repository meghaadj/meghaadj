import LinkButton from "./LinkButton";

const BackToCustomersButton = () => {
  const style = {
    backgroundColor: "#2973ba",
    marginY: 2,
    "&:hover": {
      backgroundColor: "#286090",
    },
  };
  return (
    <LinkButton text="Back to Customers" linkTo="/customers" style={style} />
  );
};

export default BackToCustomersButton;
