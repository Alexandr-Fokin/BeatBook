export default function Popup(props) {
  return (
    <div className="popup__block">
      <div className="popup__overlay"></div>
      <div className="popup__block-inner">{props.children}</div>
    </div>
  );
}
