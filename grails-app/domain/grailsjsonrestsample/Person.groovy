package grailsjsonrestsample

class Person {
	static expose = "persons"
	static hasMany = [tasks:Task]
	
	String name
	
    static constraints = {
    }
}
