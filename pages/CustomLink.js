import Link from 'next/link';
import style from './styles/CustomLink.module.css';
export const CustomLink = ({ href, text }) => {
  return (
    <Link href={href}>
      <a className={style.link}>{text}</a>
    </Link>
  );
};
