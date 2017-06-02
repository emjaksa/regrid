Grid Height Only

    const data = require('./lib/data').default;
      <Grid height={400} data={data(1000)}>
          <Column header="First Name" dataKey="firstName" />
          <Column header="Last Name" dataKey="lastName" />
          <Column header="Address" dataKey="address" width={200}/>
          <Column header="Phone Number" dataKey="phoneNumber" />
      </Grid>
      
Fill Container Height and Width

    const data = require('./lib/data').default;
    <div style={{height:400, width: 400}}>
      <Grid data={data(1000)}>
          <Column header="First Name" dataKey="firstName" />
          <Column header="Last Name" dataKey="lastName" width={300}/>
          <Column header="Address" dataKey="address" width={200}/>
          <Column header="Phone Number" dataKey="phoneNumber" />
      </Grid>
    </div>

Grid Height and Width

    const data = require('./lib/data').default;
      <Grid width={700} height={400} data={data(1000)}>
          <Column header="First Name" dataKey="firstName" />
          <Column header="Last Name" dataKey="lastName" />
          <Column header="Address" dataKey="address" width={200}/>
          <Column header="Phone Number" dataKey="phoneNumber" />
      </Grid>

No Height or Width

    const data = require('./lib/data').default;
    <Grid data={data(20)}>
        <Column header="First Name" dataKey="firstName" />
        <Column header="Last Name" dataKey="lastName" />
        <Column header="Address" dataKey="address" width={100}/>
        <Column header="Phone Number" dataKey="phoneNumber" />
    </Grid>
