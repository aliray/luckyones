import styles from './tools.less';

export default (props) => {
    const { number } = props
    return (
        <section className={styles.stage}>
            <figure className={styles.ball}>
                <span
                    className={styles.number}
                    data-number={number}>&nbsp;
                </span>
            </figure>
        </section>
    );
}