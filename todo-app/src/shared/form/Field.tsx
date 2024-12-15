import cn from 'classnames'
import { forwardRef } from 'react'
import styles from './field.module.scss'
import { IField } from './form.interface'

const Field = forwardRef<HTMLInputElement, IField>(({ error, isPage, placeholder, type = 'text', style, ...rest }, ref) => {
	return (
		<div
			className={cn(styles.field, {
				[styles.register]: isPage,
				[styles.login]: !isPage
			})}
			style={style}
		>
			<label>
				<span>{placeholder}</span>
				<input
					ref={ref}
					type={type}
					{...rest} />
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div >
	)
})

Field.displayName = "Field"

export default Field