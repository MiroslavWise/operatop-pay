import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';

import styles from '../styles/Home.module.css'



const Modal = ({
  visible = false,
  title = '',
  content = '',
  footer = '',
  onClose,
}) => {

const onKeydown = ({key}) => {
switch (key) {
case 'Escape':
onClose()
break
          }
}

React.useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
})

if (!visible) return null;

return <div className={styles.modal} onClick={onClose}>
    <div className={styles.modal-dialog} onClick={e => e.stopPropagation()}>
            <div className={styles.modal-header}>
              <h3 className={styles.modal-title}>{title}</h3>
              </div>
              <div className={styles.modal-body}>
              <div className={styles.modal-content}>{content}</div>
            </div>
        {footer && <div className={styles.modal-footer}>{footer}</div>}
        </div>
    </div>
}


const validate = values => {
  const errors = {};
  if (!values.firstName.trim() || values.firstName.trim().length > 15) {
    errors.firstName = 'Required';
  }

  if (!values.lastName.trim() || values.lastName.trim().length > 20) {
    errors.lastName = 'Required';
  }

  if (!values.email.trim() || !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim()))) {
    errors.email = 'Required';
  }

  if (!values.tel || !/^\+79\d{9}$/.test(values.tel)) {
    errors.tel = 'Required';
  }

  if (!values.number || values.number > 1000 || values.number < 1) {
    errors.number = '12';
  } 

  return errors;
};

const False = () => <div className={styles.uni}>&#10060;</div>
const True = () => <div className={styles.uni}>&#9989;</div>

const CompFormik = ({src, width}) => {
  const [isModal, setModal] = React.useState(false)
  const onClose = () => setModal(false)

  const VisibleModal = ({title, content, close, Close}) => {
    return <Modal
              visible={isModal}
              title={title}
              content={content}
              footer={close}
              onClose={Close}
          />
    }


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      number:''
    },
    validate,
    onSubmit: values => {
      setModal(true)
    },
     
  });



  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div>
        <img src={src} width={width}/>
      </div>
      <label htmlFor="firstName" className={styles.inName}>Имя</label>
      <div className={styles.in_in}>
      <input
        autoFocus
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.errors.firstName || formik.values.firstName.length === 0 
      ?
      <False /> 
      :
      <True/>}
      </div>

      
      <label htmlFor="lastName" className='inName'>Фамилия</label>
      <div className={styles.in_in}>
      <input
        className={styles.input}
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName || formik.values.lastName.length === 0 
      ?
      <False /> 
      :
      <True/>}
      </div>

  
      <label htmlFor="email">Электронный адрес</label> 
         <div className={styles.in_in}>
      <input
        placeholder='Email Address'
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email || formik.values.email.length === 0 
      ?
      <False />
      :
      <True/>}
      </div>

     
      <label htmlFor="tel">Номер телефона</label>
       <div className={styles.in_in}>
      <input
      className={styles.input}
        placeholder='+7 9XX XXX XX XX'
        id="tel"
        name="tel"
        type="tel"
        maxLength='12'
        onChange={formik.handleChange}
        value={formik.values.tel}
      />
      {formik.errors.tel || formik.values.tel.length === 0 
      ?
      <False /> 
      : 
      <True/>}
      </div>

      <label htmlFor="number">Сумма (рубли)</label>
       <div className={styles.in_in}>
      <input
      className={styles.input}
        placeholder='Введите сумму от 1 до 1000 рублей'
        id="number"
        name="number"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.number}
      />
      {formik.errors.number || formik.values.number.length === 0 
      ?
      <False /> 
      : 
      <True/>}
      </div>

      <button className={styles.button} type="submit">Оплатить</button>

      <Link to="/"><button className={styles.button}>На главную</button></Link>
        {
            Math.random() > 0.5
           ?
           <VisibleModal 
           title={<p>Вы пополнили свой счёт на {formik.values.number} рубля</p>} 
           content={`${formik.values.lastName}, спасибо за успешное пополнение!`}
           close={<Link href="/"><button className={styles.button}>На главную</button></Link>}
           onClose={onClose}/>
           :
           <VisibleModal 
           title={<p style={{color: 'red'}}>Ошибка!!!</p>} 
           content={'Попробуйте повторить снова!'}
           close={<button onClick={onClose} className={styles.button}>Закрыть</button>}
           onClose={onClose}/>
        }
      
      
    </form>
  );
};

export default CompFormik;


