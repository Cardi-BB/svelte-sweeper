<!-- Three tile Seven Segment Display -->
<script lang="ts">
  export let value: number = 0;
  $: digit1 = (value >= 0) ? Math.floor(value)% 10 : Math.floor(-value)% 10 ;
  $: digit2 = (value >= 0) ? Math.floor(value/10)% 10 : Math.floor(-value/10)% 10 ;
  $: digit3 = (value >= 0) ? Math.floor(value/100)% 10 : "-";
</script>

<div class={"time"+digit3}></div>
<div class={"time"+digit2}></div>
<div class={"time"+digit1}></div>

<style>
  div {
    float: left;
    background-image: url(../sprite100.gif);
    margin-top: 3px;
    margin-bottom: 3px;
  }
  .time0 {
    background-position: 0 0;
    width: 13px;
    height: 23px;
  }

  .time1 {
    background-position: -13px 0;
    width: 13px;
    height: 23px;
  }

  .time2 {
    background-position: -26px 0;
    width: 13px;
    height: 23px;
  }

  .time3 {
    background-position: -39px 0;
    width: 13px;
    height: 23px;
  }

  .time4 {
    background-position: -52px 0;
    width: 13px;
    height: 23px;
  }

  .time5 {
    background-position: -65px 0;
    width: 13px;
    height: 23px;
  }

  .time6 {
    background-position: -78px 0;
    width: 13px;
    height: 23px;
  }

  .time7 {
    background-position: -91px 0;
    width: 13px;
    height: 23px;
  }

  .time8 {
    background-position: -104px 0;
    width: 13px;
    height: 23px;
  }

  .time9 {
    background-position: -117px 0;
    width: 13px;
    height: 23px;
  }

  .time- {
    background-position: -130px 0;
    width: 13px;
    height: 23px;
  }
</style>
