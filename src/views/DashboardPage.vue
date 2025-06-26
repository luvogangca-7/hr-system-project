<template>
    <h1>Dashboard</h1>
    <p>Welcome back Admin, these are the stats so far!</p>
 <div class="container1">
    <div class="box">
        <h3>Total Employees</h3>
        <h1>10</h1>
    </div>
    <div class="box">
        <h3>Attendance</h3>
        <h1>10</h1>
    </div>
    <div class="box">
        <h3>Average Hours</h3>
        <h1>10</h1>
    </div>
 </div>
 <div class="container2">
    <div class="box2">
        <h3>Departments Overview</h3>
        <div class="lists">
            <ul>
        <li>IT</li>
        <li>Support</li>
        <li>QA</li>
        <li>Development</li>
        <li>Finance</li>
    </ul>
    <ul>
        <li>Marketing</li>
        <li>Design</li>
        <li>Sales</li>
        <li>HR</li>
    </ul>
        </div>
    
    </div>
    <div class="box2">
        <h3>Clock-in Status</h3>

        <div>

                <div class="opt">
                    <p>Sibongile Nkosi</p>

                    <p>Hasn't clocked in yet</p>
                </div>

                <div class="opt">
                    <p>Sibongile Nkosi</p>

                    <p>Hasn't clocked in yet</p>
                </div>

                <div class="opt">
                    <p>Sibongile Nkosi</p>

                    <p>Hasn't clocked in yet</p>
                </div>
            
        </div>
    </div>
 </div>
</template>

<script>

export default {
}
</script>
<style>
.container1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 10px 50px;
}

.box {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(182, 180, 180);
    height: 150px;
    border-radius: 9px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.container2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px 50px;
}

.box2 {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(182, 180, 180);
   border-radius: 9px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    padding: 0 20px;
}

.opt {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: antiquewhite;
    margin: 10px 5px;
    border-radius: 10px;

}

</style>