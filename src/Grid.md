Basic

    const data = require('./lib/data').default;
    <Grid data={data}>
        <Column header="First Name" dataKey="firstName" />
        <Column header="Last Name" dataKey="lastName" />
        <Column header="Address" dataKey="address" />
        <Column header="Phone Number" dataKey="phoneNumber" />
    </Grid>
