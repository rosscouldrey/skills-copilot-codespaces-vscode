function skillsMember() {
    var member = document.getElementById("member");
    var memberValue = member.options[member.selectedIndex].value;
    var memberText = member.options[member.selectedIndex].text;
    var memberSkills = document.getElementById("memberSkills");
    var memberSkillsValue = memberSkills.options[memberSkills.selectedIndex].value;
    var memberSkillsText = memberSkills.options[memberSkills.selectedIndex].text;
    if (memberValue == "member") {
        document.getElementById("memberSkills").style.display = "none";
        document.getElementById("memberSkillsLabel").style.display = "none";
    } else {
        document.getElementById("memberSkills").style.display = "inline-block";
        document.getElementById("memberSkillsLabel").style.display = "inline-block";
    }
}