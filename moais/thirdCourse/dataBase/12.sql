/1
select distinct * from comp
where int2(procnumber)>2;
/2
select compid from compos
group by compid having count(osname)>1;
/3
select comp_hdd.compid from comp_hdd
join hdd h on comp_hdd.hddmodelid = h.hddmodelid
join compos cmp on cmp.compid=comp_hdd.compid
where cmp.osname='win7'
group by comp_hdd.compid having sum(int2(h.hddsizegb)*int2(comp_hdd.hddnumber))<500;
/4
select * from compuser;
/5
select userid from compuser
group by userid having count(userid)=1;
/6
SELECT DISTINCT compuser.userid FROM compuser
INNER JOIN tuser t on compuser.userid = t.userid
GROUP BY t.userid, compuser.userid
HAVING count(compuser.compid)=(SELECT count(*) FROM comp);
;
/7
select distinct netdevicename from netdevice
where netdeviceid not in (
    select netdeviceid from netinterface
    inner join comp c on netinterface.compid = c.compid
    where compname='Comp1')
;
/8
select * from comp
where (compname like '%!_%' escape '!');
/