export default function Render({ description }) {
    return <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: description }}></div>;
}