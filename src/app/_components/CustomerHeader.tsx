import Image from "next/image";
import Link from "next/link";

export default function CustomerHeader() {
  return (
    <div className="header-wrapper">
      <div className="logo">
        <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      </div>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/'}>Login</Link>
        </li>
        <li>
          <Link href={'/'}>SignUp</Link>
        </li>
        <li>
          <Link href={'/'}>Cart(0)</Link>
        </li>
        <li>
          <Link href={'/'}>Add restaurant</Link>

        </li>
      </ul>
    </div>
  )
}

