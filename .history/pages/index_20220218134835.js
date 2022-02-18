import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.navigation}>
      <h1>Operator</h1>
      <nav>
          <Link href="/mts"><button><img src='https://upload.wikimedia.org/wikipedia/commons/c/c2/MTS_logo.svg' height={'24px'} alt='MTS'/><a className={styles.a}>MTS</a></button></Link>
          <Link href="/beeline"><button><img src={'https://upload.wikimedia.org/wikipedia/en/b/b1/Beeline.svg'} height={'24px'} alt='Beeline'/><a className={styles.a}>Beeline</a></button></Link>
          <Link href="/megafon"><button><img src={'https://upload.wikimedia.org/wikipedia/commons/9/9e/MegaFon_logo.svg'}  width={'40px'}/><a className={styles.a}>Megafon</a></button></Link>
      </nav>
    </div>
  )
}
