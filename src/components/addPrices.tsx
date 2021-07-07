// @flow

import {
	Container,
	Grid,
	Typography,
	makeStyles,
	Theme,
	TextField,
	Button,
	FormControl,
	Select,
	InputLabel,
} from '@material-ui/core';

enum Condition {
	G = 'G',
	VG = 'VG',
	F = 'F',
	VF = 'VF',
	XF = 'XF',
	UNC = 'UNC',
	PROOF = 'PROOF',
}
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		marginTop: '50px',
	},
}));
type Props = {};
const AddPricesForm = (props: Props) => {
	const styles = useStyles();
	return (
		<div>
			<Container component="main" maxWidth="xs">
				<Grid className={styles.root} container justify="center" direction="column">
					<form>
						<Grid item xs={12}>
							<Typography variant="h4" align="center">
								Adding the prices
							</Typography>
						</Grid>
						<Grid>
							<TextField
								margin="normal"
								variant="outlined"
								name="coin"
								id="coin"
								label="Монета"
								fullWidth
							/>
						</Grid>
						<Grid>
							<TextField
								margin="normal"
								variant="outlined"
								name="currency"
								id="cerrency"
								label="Валюта"
								fullWidth
							/>
						</Grid>
						<Grid>
							<FormControl fullWidth variant="outlined" margin="normal">
								<InputLabel variant="outlined" id="condition">
									Состояние
								</InputLabel>
								<Select
									label="Состояние"
									variant="outlined"
									id="condition"
									native
									name="condition"
									inputProps={{
										id: 'select-condition',
									}}>
									<option value="F">{Condition.F}</option>
									<option value="UNC">{Condition.UNC}</option>
									<option value="G">{Condition.G}</option>
									<option value="VG">{Condition.VG}</option>
									<option value="VF">{Condition.VF}</option>
									<option value="PROOF">{Condition.PROOF}</option>
								</Select>
							</FormControl>
						</Grid>
						<Grid>
							<TextField
								margin="normal"
								variant="outlined"
								name="price"
								id="price"
								label="Цена"
								fullWidth
							/>
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary">
							Сохранить
						</Button>
					</form>
				</Grid>
			</Container>
		</div>
	);
};

export default AddPricesForm;
