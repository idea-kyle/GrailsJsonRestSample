package grailsjsonrestsample

class Person {
	static expose = true
	static hasMany = [tasks:Task]
	
	String name
	
    static constraints = {
    }
}
